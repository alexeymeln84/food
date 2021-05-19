const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await result.json();
};

const cardMenu = async (url) => {
    const cards = await fetch(url, {
        method: 'GET'
    });

    if(!cards.ok) {
        throw new Error(`Could not fetch ${url}, status: ${cards.status}`);
    }
    return await cards.json();
};

export {cardMenu};
export {postData};