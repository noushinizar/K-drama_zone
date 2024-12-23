import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDramaWithTrailer } from "../redux/DramaSlice";

function DramaDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedDrama, loading } = useSelector((state) => state.dramas);

  useEffect(() => {
    dispatch(fetchDramaWithTrailer(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white relative">
        <div className="relative">
          {/* Outer Pulsating Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-pink-600 border-opacity-50 animate-ping"></div>
          {/* Inner Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 border-solid"></div>
        </div>
        {/* Loading Text */}
        <div className="absolute bottom-16 text-center">
          <p className="text-lg font-bold animate-pulse">Loading, please wait...</p>
        </div>
      </div>
    );

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return selectedDrama ? (
    <div className="p-6 space-y-8 bg-black-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w300${selectedDrama.poster_path}`}
              alt={selectedDrama.name || selectedDrama.title}
              className="w-50 h-50 object-fill rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold">
              {selectedDrama.name || selectedDrama.title}
            </h1>
            <p className="text-lg">
              {truncateString(selectedDrama.overview, 300)}
            </p>
            <div className="text-sm text-gray-400">
              <p>
                <strong>First Aired:</strong> {selectedDrama.first_air_date}
              </p>
              <p>
                <strong>Last Aired:</strong> {selectedDrama.last_air_date}
              </p>
            </div>
            {selectedDrama.trailerUrl && (
              <div className="mt-4">
                <a
                  href={selectedDrama.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                >
                  Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Cast Section */}
        {selectedDrama.cast && selectedDrama.cast.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Cast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mt-4">
              {selectedDrama.cast.slice(0, 12).map((actor) => (
                <div key={actor.id} className="text-center">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="rounded w-20 h-24  object-cover mx-auto"
                    />
                  ) : (
                    <div className="w-20 h-24 rounded bg-gray-500 mx-auto"></div>
                  )}
                  <p className="mt-2 text-sm text-gray-300">{actor.name}</p>
                  <p className="text-xs text-gray-500">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crew Section */}
        {selectedDrama.crew && selectedDrama.crew.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Crew</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mt-4">
              {selectedDrama.crew.slice(0, 8).map((member) => (
                <div key={member.id} className="text-center">
                  {member.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                      alt={member.name}
                      className="rounded w-20 h-24  object-cover mx-auto"
                    />
                  ) : (
                    <div className="rounded w-20 h-24  bg-gray-500"></div>
                  )}
                  <div>
                    <p className="font-medium text-sm text-white">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-400">{member.job}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <p className="text-center text-lg text-gray-500">
      No drama details available.
    </p>
  );
}

export default DramaDetails;
