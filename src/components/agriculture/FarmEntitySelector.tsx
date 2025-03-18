
import React from 'react';
import { FarmEntityType } from '@/types/agriculture';
import GlassCard from '@/components/ui/GlassCard';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plant, Home, Sprout, Leaf } from 'lucide-react';

interface FarmEntitySelectorProps {
  selectedEntity: {
    type: FarmEntityType;
    id: string;
  };
  onEntityChange: (type: FarmEntityType, id: string) => void;
}

const FarmEntitySelector: React.FC<FarmEntitySelectorProps> = ({
  selectedEntity,
  onEntityChange
}) => {
  // Demo entity IDs
  const entityOptions: Record<FarmEntityType, { id: string; name: string }[]> = {
    'farmland': [
      { id: 'demo-farm-01', name: 'Green Valley Farms' },
      { id: 'custom-farm-1', name: 'Riverside Fields' }
    ],
    'greenhouse': [
      { id: 'demo-farm-02', name: 'Sunlight Greenhouses' },
      { id: 'custom-greenhouse-1', name: 'Tech Eden Greenhouse' }
    ],
    'orchard': [
      { id: 'demo-farm-03', name: 'Fruitful Orchards' },
      { id: 'custom-orchard-1', name: 'Harvest Apple Orchard' }
    ],
    'livestock': [
      { id: 'demo-farm-04', name: 'Meadow Ranch' },
      { id: 'custom-livestock-1', name: 'Highland Pastures' }
    ]
  };

  const handleTypeChange = (type: FarmEntityType) => {
    // When changing farm type, select the first ID of that type
    onEntityChange(type, entityOptions[type][0].id);
  };

  const handleEntityChange = (id: string) => {
    onEntityChange(selectedEntity.type, id);
  };

  return (
    <GlassCard className="p-4">
      <h3 className="text-lg font-medium mb-4">Select Farm Entity</h3>
      
      <div className="space-y-6">
        <div>
          <div className="mb-3 text-sm text-muted-foreground">Entity Type</div>
          <RadioGroup 
            value={selectedEntity.type} 
            onValueChange={(value) => handleTypeChange(value as FarmEntityType)}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="farmland" id="farmland" />
              <Label htmlFor="farmland" className="flex items-center cursor-pointer">
                <Plant className="h-4 w-4 mr-2 text-green-600" />
                Farmland
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="greenhouse" id="greenhouse" />
              <Label htmlFor="greenhouse" className="flex items-center cursor-pointer">
                <Home className="h-4 w-4 mr-2 text-green-600" />
                Greenhouse
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="orchard" id="orchard" />
              <Label htmlFor="orchard" className="flex items-center cursor-pointer">
                <Leaf className="h-4 w-4 mr-2 text-green-600" />
                Orchard
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="livestock" id="livestock" />
              <Label htmlFor="livestock" className="flex items-center cursor-pointer">
                <Sprout className="h-4 w-4 mr-2 text-green-600" />
                Livestock
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <div className="mb-2 text-sm text-muted-foreground">Entity ID</div>
          <Select 
            value={selectedEntity.id} 
            onValueChange={handleEntityChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select entity" />
            </SelectTrigger>
            <SelectContent>
              {entityOptions[selectedEntity.type].map(entity => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cryptographic Identity:</span>
            <span className="font-mono">
              {selectedEntity.id.substring(0, 4)}...{selectedEntity.id.substring(selectedEntity.id.length - 4)}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted-foreground">Verification Status:</span>
            <span className="text-green-600">Verified ✓</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default FarmEntitySelector;
