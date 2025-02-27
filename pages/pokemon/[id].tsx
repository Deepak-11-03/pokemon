// pages/pokemon/[id].tsx
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Pokemon {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
    moves: { move: { name: string } }[];
  }
interface PokemonProps {
  pokemon: Pokemon;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);
  const data = await res.json();

  return {
    props: { pokemon: data },
  };
};

export default function PokemonDetails({ pokemon }: PokemonProps) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => setLoading(false), 1000);
    }, []);
  
    // if (loading) {
    //   return (
    //     <div className="flex items-center justify-center min-h-screen text-2xl">
    //       Loading...
    //     </div>
    //   );
    // }
  return (
    <div className="p-6 max-w-3xl mx-auto bg-gradient-to-r h-screen flex flex-col items-center text-white">
      <Link href="/" className="self-start text-sm font-semibold bg-white text-blue-500 px-4 py-2 rounded-lg shadow hover:bg-gray-200">← Back</Link>
      
      <div className="mt-5 p-6 bg-white text-gray-800 rounded-lg shadow-lg w-full text-center">
        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-30 h-30  drop-shadow-lg"
        />

        <h2 className="text-xl font-semibold">Type(s)</h2>
        <div className="flex justify-center gap-3 mt-2">
          {pokemon.types.map(({ type }) => (
            <span key={type.name} className="px-4 py-2 bg-blue-500 text-white rounded-full text-md shadow-md">
              {type.name}
            </span>
          ))}
        </div>

        <h2 className="text-xl mt-4 font-semibold">Abilities</h2>
        <ul className="list-none flex justify-center gap-3 flex-wrap mt-2">
          {pokemon.abilities.map(({ ability }) => (
            <li key={ability.name} className="bg-gray-200 px-3 py-1 rounded-lg shadow text-md capitalize">
              {ability.name}
            </li>
          ))}
        </ul>

        <h2 className="text-xl mt-4 font-semibold">Base Stats</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {pokemon.stats.map(({ stat, base_stat }) => (
            <div key={stat.name} className="p-3 bg-blue-100 rounded-lg shadow text-gray-900">
              <strong className="capitalize text-lg">{stat.name}</strong>: <span className="font-semibold">{base_stat}</span>
            </div>
          ))}
        </div>
        <h2 className="text-2xl mt-6 font-semibold">Moves</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
          {pokemon.moves.slice(0, 20).map(({ move }) => (
            <span key={move.name} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md shadow-md text-sm capitalize">
              {move.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
