export const fetchPokemonList = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await res.json();
    return data.results;
  };
  
  export const fetchPokemonDetails = async (url) => {
    const res = await fetch(url);
    return await res.json();
  };