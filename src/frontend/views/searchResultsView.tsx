import { SearchResult, TitleId } from "../../backend/model/title";
import { IconArrowLeft, IconArrowRight, IconHeart } from '@tabler/icons';
import { Link } from "react-router-dom";

export interface SearchResultsProps {
	titles: SearchResult[],
	
	isUserLoggedIn: boolean,
	userWatchlist: TitleId[],

	page: number,
	maxPage: number,

	onModifyList: (title: SearchResult) => void,
	onSelectTitle: (title: SearchResult) => void
	onNavigatePage: (offset: number) => void
}

function SearchEntry(props: SearchResultsProps, title: SearchResult) {
	const addToDivStyle = props.isUserLoggedIn ? "" : "pointer-events-none";

	const titleInWatchlist = props.userWatchlist.some(t => t === title.id);
	let heartStyle = "inline hover:cursor-pointer align-middle hover:scale-110";

	if(titleInWatchlist) {
		heartStyle += " stroke-red-500 fill-red-500";
	}
	
	return (
		<div key={title.id} className="min-w-[16rem] h-96 mx-12 my-6 flex justify-center">
			<div style={{backgroundImage: `url(${title.imageUrl})`}} 
				className={`${addToDivStyle} group overflow-hidden bg-cover basis-64 h-96 rounded-lg overflow-hidden relative`}>
				<div className="w-64 h-64 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0"></div>
				<span className="font-bold text-center px-2 pb-4 absolute bottom-0 w-full origin-bottom -translate-y-0 transition-transform duration-100 group-hover:-translate-y-10">
					{title.name}
				</span>
				<div className="h-8 absolute -bottom-8 flex w-full justify-center transition-transform duration-100 group-hover:-translate-y-12">
					<IconHeart onClick={() => props.onModifyList(title)} width="32" height="32" className={`${heartStyle}`}></IconHeart>
				</div>
				<Link to="/details" onClick={() => props.onSelectTitle(title)}>
					<div className="w-full h-72 absolute top-0"></div>
				</Link>
			</div>
		</div>
	);
}

export default function SearchResultsView(props: SearchResultsProps) {
	const leftEnabled = props.page > 0;
	const rightEnabled = props.page < props.maxPage - 1;

	const leftStyle = leftEnabled ? "hover:bg-black/30 hover:cursor-pointer" : "opacity-60 pointer-events-none";
	const rightStyle = rightEnabled ? "hover:bg-black/30 hover:cursor-pointer" : "opacity-60 pointer-events-none";

	return (
		<div id="search-results-view" className="w-full shrink-0 grow flex justify-center items-center px-[5%] py-12 flex-col select-none">
			<div className="w-full grow flex justify-center items-center flex-wrap">
				{props.titles.map(title => SearchEntry(props, title))}
			</div>
			<div className="w-full h-6"></div>
			{props.maxPage > 1 && <div className="flex bg-[#006466] w-32 h-10 rounded-md overflow-hidden">
				<div className={`${leftStyle} flex shrink-0 grow-0 basis-10 h-10 justify-center items-center`} onClick={() => props.onNavigatePage(-1)}>
					<IconArrowLeft className="inline w-8 h-8"></IconArrowLeft>
				</div>
				<span className="shrink grow font-bold text-center leading-10 align-middle pointer-events-none">
					{`${props.page+1}/${props.maxPage}`}
				</span>
				<div className={`${rightStyle} flex shrink-0 grow-0 basis-10 h-10 justify-center items-center`} onClick={() => props.onNavigatePage(1)}>
					<IconArrowRight className="inline w-8 h-8"></IconArrowRight>
				</div>
			</div>}
		</div>
	);
}