import React from 'react';
import { EntityType, EntitySelectorProps } from '@/types/iot';

const EntitySelector: React.FC<EntitySelectorProps> = ({
  selectedEntityId,
  onEntitySelect,
  entityType,
  onEntityTypeChange,
}) => {
  // Mock data for demo purposes
  const entities = {
    company: [
      { id: 'comp-001', name: 'TechCorp Inc.' },
      { id: 'comp-002', name: 'GreenEnergy Ltd.' },
      { id: 'comp-003', name: 'EcoManufacturing Co.' },
    ],
    city: [
      { id: 'city-001', name: 'EcoCity' },
      { id: 'city-002', name: 'GreenTown' },
      { id: 'city-003', name: 'Sustainable City' },
    ],
    civilian: [
      { id: 'civ-001', name: 'John Doe' },
      { id: 'civ-002', name: 'Jane Smith' },
      { id: 'civ-003', name: 'Bob Johnson' },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center p-4 bg-card rounded-lg shadow-sm">
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <label htmlFor="entityType" className="text-sm font-medium text-muted-foreground">
          Entity Type
        </label>
        <select
          id="entityType"
          value={entityType}
          onChange={(e) => onEntityTypeChange(e.target.value as EntityType)}
          className="px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ecosync-green-dark"
        >
          <option value="company">Company</option>
          <option value="city">City</option>
          <option value="civilian">Civilian</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-auto">
        <label htmlFor="entityId" className="text-sm font-medium text-muted-foreground">
          Select Entity
        </label>
        <select
          id="entityId"
          value={selectedEntityId || ''}
          onChange={(e) => onEntitySelect(e.target.value)}
          className="px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ecosync-green-dark"
        >
          <option value="">Select an entity</option>
          {entities[entityType].map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EntitySelector;
