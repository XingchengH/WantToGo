export async function fetchAvailablePlace() {
    const response = await fetch('http://localhost:3000/places');
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }

    return data.places;
}

export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch user places');
    }

    return data.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({ places: places }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Failed to update user places');
    }

    return resData.message;
}