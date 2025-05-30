import { useEffect, useState } from "react";


function API(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //GET
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => { 
            console.log(response.status);    
            return response.json();
        })
        .then(data => {
            setPosts(data.slice(0, 5));
            setLoading(false);
        })
        .catch(error => console.error('Error: ', error));
        
        //POST : them du lieu moi
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'React Hook Form',
                body: 'Thêm bài viết mới',
                userId: 1,
            }),
        })
        .then(response => response.json())
        .then(data => console.log('Kết quả POST:', data));

        //PUT: cap nhat toan bo 1 doi tuong

        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                title: 'Cập nhật tiêu đề',
                body: 'Nội dung đã thay đổi',
                userId: 1,
            }),
        })
        .then(response => response.json())
        .then(data => console.log('Kết quả PUT:', data));

        // DELETE
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Xoá thành công!');
            } else {
                console.log('Xoá thất bại.');
            }
        });


    }, []);
    
    // dung map de xu ly du lieu trong mang
    return (
        <div style={{ padding: 20 }}>
            <h2>Danh sách bài viết</h2>
            {loading ? (<p>loading...</p>) : (<ul>
                {posts.map(post => (
                <li key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
                ))}
            </ul>)}
        </div>
    );
}

export default API;