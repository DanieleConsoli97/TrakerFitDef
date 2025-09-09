import { Input, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMemo } from "react";

const SearchAndFilter = ({ 
  exercises, 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  filterGroup, 
  setFilterGroup,
  filteredCount 
}) => {
  // Get unique muscle groups for filter dropdown
  const muscleGroups = useMemo(() => {
    if (!exercises) return [];
    const groups = [...new Set(exercises.map(ex => ex.gruppo_muscolare))];
    return groups.filter(Boolean).sort();
  }, [exercises]);

  return (
    <div className="space-y-3">
      <Input
        placeholder="Cerca esercizi per nome o gruppo muscolare..."
        value={searchTerm}
        onValueChange={setSearchTerm}
        startContent={<Icon icon="lucide:search" className="text-default-400" />}
        isClearable
        onClear={() => setSearchTerm("")}
      />
      
      <div className="flex gap-3">
        <Select
          label="Filtra per gruppo"
          selectedKeys={[filterGroup]}
          onSelectionChange={(keys) => setFilterGroup(Array.from(keys)[0])}
          className="flex-1"
        >
          <SelectItem key="all">Tutti i gruppi</SelectItem>
          {muscleGroups.map((group) => (
            <SelectItem key={group}>{group}</SelectItem>
          ))}
        </Select>
        
        <Select
          label="Ordina per"
          selectedKeys={[sortBy]}
          onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
          className="flex-1"
        >
          <SelectItem key="nome">Nome A-Z</SelectItem>
          <SelectItem key="gruppo_muscolare">Gruppo muscolare</SelectItem>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-default-500">
        {filteredCount} esercizi trovati
      </div>
    </div>
  );
};

export default SearchAndFilter;