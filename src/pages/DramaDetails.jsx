import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import {  fetchDramas } from "../redux/DramaSlice"; // Update with correct path

export function DramaDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.dramas);

  useEffect(() => {
    if (id) {
      dispatch(fetchDramas(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  if (!details) {
    return <p className="text-gray-400">Drama details not found.</p>;
  }

  const {
    title,
    name,
    overview,
    poster_path,
    first_air_date,
    last_air_date,
    cast,
    crew,
    trailer,
  } = details;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={`https://image.tmdb.org/t/p/w400${poster_path}`}
          alt={name || title}
          className="rounded-lg w-full md:w-1/3"
        />
        <div className="flex-1">
          <Typography variant="h4" color="white">
            {name || title}
          </Typography>
          <p className="text-gray-400 mt-2">{overview}</p>
          <p className="text-gray-400 mt-2">
            <strong>First Aired:</strong> {first_air_date}
          </p>
          <p className="text-gray-400 mt-2">
            <strong>Last Aired:</strong> {last_air_date}
          </p>
          <div className="mt-4">
            <Typography variant="h6" color="white">
              Cast & Crew
            </Typography>
            <ul className="text-gray-400 list-disc ml-4">
              {cast?.map((actor) => (
                <li key={actor.id}>{actor.name} as {actor.character}</li>
              ))}
              {crew?.map((member) => (
                <li key={member.id}>{member.name} - {member.job}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {trailer && (
        <div className="mt-6">
          <Typography variant="h6" color="white">
            Watch Trailer
          </Typography>
          <iframe
            className="w-full h-64 mt-4"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Drama Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default DramaDetails;
