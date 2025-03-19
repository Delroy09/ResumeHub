
import { Save, Download, Upload, Settings, PanelLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EditorToolbarProps {
  onToggleSidebar: () => void;
  onSave: () => void;
  onImport: () => void;
  onExport: (format: string) => void;
}

const EditorToolbar = ({ onToggleSidebar, onSave, onImport, onExport }: EditorToolbarProps) => {
  return (
    <div className="border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto h-14 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <PanelLeft size={20} />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
          >
            <Save size={16} className="mr-2" />
            Save
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onImport}
          >
            <Upload size={16} className="mr-2" />
            Import
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Download size={16} className="mr-2" />
                Export
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('jpg')}>
                Export as JPG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Settings"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
