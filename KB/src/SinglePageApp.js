import {BrowserRouter as Router, Routes, Link, Route, Outlet, useParams} from 'react-router-dom';

const posts= [
    {
        title: "abc",
        slug: "a"
    },
    {
        title: "xyz",
        slug: "b"
    }
]

function Home(){
    return (
        <div style={{width: 1000, height: 1000, alignContent: "center"}}>HOME</div>
    );
}

function About(){
    return (
        <div>
            <h1 >About</h1>
            <Outlet/>
        </div>
    );
}

function Posts(){
    return (
        <ul>
            {posts.map(element => (
                <li key={element.slug}><Link to={`/about/${element.slug}`}>{element.title}</Link></li>
            ))}
        </ul>
    );
}

function NoMatch(){
    return (
        <h1>404 NOT FOUND</h1>
    );
}

function Post(){
    const {param} = useParams();
    let post;
    for(let i = 0; i < posts.length; i++){
        if(posts[i].slug == param){
            post = posts[i];
            break;
        }
    }
    console.log(post);

    return (
        <div>
            {post ? (<div><p>{post.title}</p>
            <p>{post.slug}</p></div>) : (<p>Not Found</p>)}
        </div>
    );
}

function SPA () {
    return (
        <div>
            <Router>
                <nav>
                    <Link to="/" style={{margin: 10}}>Home</Link>
                    <Link to="/about">About</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/about" element={<About/>}>
                        <Route index element={<Posts />}></Route>
                        <Route path=":param" element={<Post/>}></Route>
                    </Route>
                    <Route path="*" element={<NoMatch/>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default SPA;