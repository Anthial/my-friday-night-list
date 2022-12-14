import { SearchResult, Title, TitleId } from "../model/title";
import { database } from "./app";
import { get, ref, remove, set, query, orderByChild, limitToFirst, DatabaseReference } from "firebase/database";
import { SHA256 } from "crypto-js";
import { Availability } from "../model/availability";

interface CachedImdbTitle {
	title: Title,
	cacheTime: number
}

interface CachedImdbSearch {
	query: string,
	results: SearchResult[],
	cacheTime: number
}

interface CachedAvailability {
	availability: Availability,
	cacheTime: number,
}

interface CachedEpisodes {
	episodes: any,
	cacheTime: number,
}

interface CachedTrivia {
	trivia: any,
	cacheTime: number,
}

export function getTriviaFromFirebase(id: TitleId): Promise<any> {
	const triviaRef = ref(database, "cache/imdb/trivia/" + id);

	return get(triviaRef).then(data => {
		const cacheEntry = data.val() as CachedEpisodes;

		if(cacheEntry) {
			if(isExpiredCacheEntry(cacheEntry.cacheTime)) {
				remove(triviaRef);
				throw new Error("Cached data is too old, removing");
			}

			return cacheEntry.episodes;
		}

		throw new Error("Not found in Firebase cache");
	});
}

export function cacheTriviaInFirebase(result: any, id: TitleId) {
	const triviaRef = ref(database, "cache/imdb/trivia/" + id);
	set(triviaRef, { episodes: result, cacheTime: Math.floor(Date.now() / 1000) });
}


export function getEpisodesFromFirebase(id: TitleId, season: string): Promise<any> {
	const episodeRef = ref(database, "cache/imdb/episodes/" + id +"/" + season);

	return get(episodeRef).then(data => {
		const cacheEntry = data.val() as CachedEpisodes;

		if(cacheEntry) {
			if(isExpiredCacheEntry(cacheEntry.cacheTime)) {
				remove(episodeRef);
				throw new Error("Cached data is too old, removing");
			}

			return cacheEntry.episodes;
		}

		throw new Error("Not found in Firebase cache");
	});
}

export function cacheEpisodesInFirebase(result: any, id: TitleId, season: string) {
	const episodeRef = ref(database, "cache/imdb/episodes/" + id +"/" + season);
	set(episodeRef, { episodes: result, cacheTime: Math.floor(Date.now() / 1000) });
}

export function getAvailabilityFromFirebase(id: TitleId, region: string): Promise<Availability>{
	const titleRef = ref(database, "cache/availability/title/" + id + "/" + region);
	return get(titleRef).then(data => {
		const cacheEntry = data.val() as CachedAvailability;

		if(cacheEntry) {
			if(isExpiredCacheEntry(cacheEntry.cacheTime)) {
				remove(titleRef);
				throw new Error("Cached data is too old, removing");
			}

			return cacheEntry.availability;
		}

		throw new Error("Not found in Firebase cache");
	})
}

export function cacheAvailabilityInFirebase(availability: Availability) {
	const titleRef = ref(database, "cache/availability/title/" + availability.imdbID + "/" + availability.region);
	set(titleRef, { availability: availability, cacheTime: Math.floor(Date.now() / 1000) });
}

/* API responses are cached for two days */
function isExpiredCacheEntry(cacheTime: number) {
	const secondsInDay = 86400;

	/* Date.now() returns time in milliseconds so we convert it to seconds */
	return Math.floor(Date.now() / 1000) - cacheTime > secondsInDay * 2;
}

export function getTitleFromFirebase(id: TitleId): Promise<Title> {
	const titleRef = ref(database, "cache/imdb/title/" + id);

	return get(titleRef).then(data => {
		const cacheEntry = data.val() as CachedImdbTitle;

		if(cacheEntry) {
			if(isExpiredCacheEntry(cacheEntry.cacheTime)) {
				remove(titleRef);
				throw new Error("Cached data is too old, removing");
			}

			return cacheEntry.title;
		}

		throw new Error("Not found in Firebase cache");
	});
}

export function cacheTitleInFirebase(title: Title) {
	const titleRef = ref(database, "cache/imdb/title/" + title.id);
	set(titleRef, { title: title, cacheTime: Math.floor(Date.now() / 1000) });
}

export function searchImdbInFirebase(query: string): Promise<SearchResult[]> {
	const queryRef = ref(database, "cache/imdb/search/" + SHA256(query));

	return get(queryRef).then(data => {
		const cacheEntry = data.val() as CachedImdbSearch;

		if(cacheEntry) {
			if(isExpiredCacheEntry(cacheEntry.cacheTime)) {
				remove(queryRef);
				throw new Error("Cached data is too old, removing");
			}

			return cacheEntry.results;
		}

		throw new Error("Not found in Firebase cache");
	});
}

/* Only save the latest 20 searches in Firebase */
const maxSearchesInFirebase = 20;

export function cacheSearchInFirebase(searchQuery: string, results: SearchResult[]) {
	const searchCacheRef = ref(database, "cache/imdb/search");
	const queryRef = ref(database, "cache/imdb/search/" + SHA256(searchQuery));

	set(queryRef, { 
		query: searchQuery, 
		results: results, 
		cacheTime: Math.floor(Date.now() / 1000) 
	}).then(() => {
		get(query(searchCacheRef, orderByChild("cacheTime"), limitToFirst(maxSearchesInFirebase + 1)))
			.then(data => {
				let numberOfChildrenFound = 0;
				let firstChild: DatabaseReference | null = null;

				data.forEach(c => {
					numberOfChildrenFound++;
					if(!firstChild) firstChild = c.ref;
				});

				if(firstChild && numberOfChildrenFound > maxSearchesInFirebase) {
					remove(firstChild);
				}
			});
	});
}