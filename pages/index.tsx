// pages/index.tsx
import { useState } from "react";
import { GetServerSideProps } from "next";
import PokemonCard from "./components/PokemonCard";


interface Pokemon {
  name: string;
  url: string;
}

interface HomeProps {
  pokemons: Pokemon[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  const data = await res.json();

  return {
    props: { pokemons: data.results },
  };
};

export default function Home({ pokemons }: HomeProps) {
  const [search, setSearch] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 max-w-3xl mx-auto">
     <div className="flex justify-between items-center"> 
      <h1 className="text-2xl font-bold  mb-4">
        Pokemon App
      </h1>
     <input
        type="text"
        placeholder="Search Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" p-2 mb-4 bg-white rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
     </div>
      {filteredPokemons?.length === 0 && (
        <p className="text-center text-lg font-semibold">No Pokemon found!</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}
