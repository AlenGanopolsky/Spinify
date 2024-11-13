import url_link from './consts';

const RedirectButton = () => {

    return (
        <a href={url_link()} className = "bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded font-mono">
        
        Login
        </a>
    );
};

    export default RedirectButton;
    


