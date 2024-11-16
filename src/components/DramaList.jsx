import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDramas } from '../redux/DramaSlice';
import { DrawerDefault } from './Drawer';

// import GenreDrawer from './Drawer';

const KDramaList = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const dramas = useSelector((state) => state.dramas.list);
    const loading = useSelector((state) => state.dramas.loading);
    const genreFilter = useSelector((state) => state.dramas.genreFilter);

    const genres = [
        { id: 18, name: 'Drama' },
        { id: 35, name: 'Comedy' },
        { id: 10749, name: 'Romance' },
        { id: 80, name: 'Crime' },
        { id: 9648, name: 'Mystery' },
    ];

    useEffect(() => {
        // Fetch dramas on component mount or when genreFilter changes
        dispatch(fetchDramas(genreFilter));
    }, [dispatch, genreFilter]);

    return (
        <div>
            <button onClick={() => setDrawerOpen(true)}>Select Genre</button>

            {drawerOpen && (
                <DrawerDefault genres={genres} onClose={() => setDrawerOpen(false)} />
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {dramas.map((drama) => (
                        <li key={drama.id}>{drama.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default KDramaList;
