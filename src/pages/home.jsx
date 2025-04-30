import React, { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../services/api';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import PokemonCard from '../components/PokemonCard';

const Home = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const list = await fetchPokemonList();
        const details = await Promise.all(list.map(p => fetchPokemonDetails(p.url)));
        const formatted = details.map(p => ({
          id: p.id,
          name: p.name,
          image: p.sprites.front_default,
          types: p.types.map(t => t.type.name),
        }));
        setAllPokemon(formatted);
        setFilteredPokemon(formatted);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let filtered = allPokemon;
    if (search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedType) {
      filtered = filtered.filter(p => p.types.includes(selectedType));
    }
    setFilteredPokemon(filtered);
  }, [search, selectedType, allPokemon]);

  return (
    <div className="container">
      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
      {loading ? (
        <p>Loading Pokémon...</p>
      ) : filteredPokemon.length === 0 ? (
        <p>No Pokémon match your search.</p>
      ) : (
        <div className="grid">
          {filteredPokemon.map(p => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;