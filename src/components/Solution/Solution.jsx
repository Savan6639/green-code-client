import PropTypes from "prop-types";
import { BiCopy } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function Solution({title,code,language,admin}){

	// update gihub object which has css of syntaxt hilighting
	github.hljs.background = "white"
	
    return (
        <div className="bg-white px-3 pb-3 m-3 rounded-xl min-w-[300px] max-w-[1000px] gc-shadow-solution my-6" >
			<div className="flex justify-between items-center">
				<div className="relative bg-white w-fit -translate-y-1/3 py-1 px-2 rounded-md gc-shadow-solution-title"  >{title}</div>
				<div className='flex justify-between items-center'>
					<BiCopy className='relative translate-y-2 text-3xl hover:scale-110 duration-200 gc-text-green' />
					{admin && <MdDeleteForever className='relative translate-y-2 text-3xl hover:scale-110 duration-200 mx-3 text-red-500 ' />}
					{admin && <FiEdit className='relative translate-y-2 text-2xl hover:scale-110 duration-200' />}
				</div>
			</div>
			<SyntaxHighlighter  language={language} style={github}>
				{code}
			</SyntaxHighlighter>
		
		</div>
    );
}

Solution.propTypes = {
    title: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
	admin: PropTypes.bool.isRequired
}

export default Solution;