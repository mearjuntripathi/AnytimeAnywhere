import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Save, Lightbulb, Clock, CheckCircle } from "lucide-react";
import { CodeLab } from "@shared/schema";
import { DIFFICULTY_COLORS } from "@/lib/constants";
import { useState } from "react";

interface CodeLabProps {
  lab: CodeLab;
}

export default function CodeLabComponent({ lab }: CodeLabProps) {
  const [currentCode, setCurrentCode] = useState(lab.starterCode);
  const [output, setOutput] = useState(">>> Waiting for code execution...\nHint: Complete the implementation to see results");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput(`>>> Running ${lab.title}...\nModel initialized successfully\nTraining data shape: (100, 1)\nTarget data shape: (100, 1)\n\n${currentCode.includes('training loop') ? 'Training completed successfully!' : 'Waiting for implementation...'}`);
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setCurrentCode(lab.starterCode);
    setOutput(">>> Code reset to starter template\nReady for implementation");
  };

  const handleSave = () => {
    localStorage.setItem(`lab_${lab.id}`, currentCode);
    setOutput(">>> Code saved successfully\nYour progress has been saved");
  };

  return (
    <Card className="overflow-hidden shadow-2xl bg-gray-900 text-white">
      {/* Lab Header */}
      <CardHeader className="bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-white">{lab.title}</h3>
            <Badge className={DIFFICULTY_COLORS[lab.difficulty as keyof typeof DIFFICULTY_COLORS]}>
              {lab.difficulty}
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleRun}
              disabled={isRunning}
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Code Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
        {/* Code Editor */}
        <div className="bg-gray-900 p-6 overflow-auto">
          <textarea
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            className="w-full h-full bg-transparent text-gray-300 font-mono text-sm leading-relaxed resize-none outline-none"
            spellCheck={false}
          />
        </div>

        {/* Output Console */}
        <div className="bg-gray-800 border-l border-gray-700">
          <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
            <h4 className="text-white font-medium">Output Console</h4>
          </div>
          <div className="p-4 h-full overflow-auto">
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </div>
      </div>

      {/* Lab Instructions */}
      <CardContent className="bg-gray-800 border-t border-gray-700">
        <h4 className="text-white font-semibold mb-3">Instructions:</h4>
        <div className="text-gray-300 mb-4">
          <div className="prose prose-invert max-w-none text-sm">
            <div dangerouslySetInnerHTML={{ __html: lab.instructions.replace(/\n/g, '<br/>') }} />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Progress: 2/4 steps completed</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>Time: {lab.estimatedTime}min</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-blue-400 hover:text-blue-300"
            onClick={() => {
              if (lab.hints && lab.hints.length > 0) {
                alert(`Hint: ${lab.hints[0]}`);
              }
            }}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Get Hint
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
