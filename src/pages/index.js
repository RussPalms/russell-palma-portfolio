import Head from "next/head";
import Portfolio from "../components/Portfolio";
import Resume from "../components/Resume";

export default function Home() {
	return (
		<>
			<Head>
				<title>Russell Palma's Portfolio</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
					integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
					crossOrigin="anonymous"
					referrerpolicy="no-referrer"
				/>
			</Head>

			<Portfolio />
			{/* <Resume /> */}
		</>
	);
}
