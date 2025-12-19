import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star, Flame } from "lucide-react";

interface ProgressDashboardProps {
  userProgress?: {
    courses: { [key: string]: number };
    stats: {
      labsCompleted: number;
      projectsBuilt: number;
      timeInvested: string;
    };
    streak: number;
    achievements: Array<{
      name: string;
      icon: string;
      dateCompleted: string;
      color: string;
    }>;
  };
}

export default function ProgressDashboard({ userProgress }: ProgressDashboardProps) {
  const mockProgress = {
    courses: {
      'Foundation Course': 75,
      'Machine Learning': 45,
      'Deep Learning': 0,
      'Generative AI': 0,
    },
    stats: {
      labsCompleted: 24,
      projectsBuilt: 8,
      timeInvested: '42h',
    },
    streak: 7,
    achievements: [
      { name: 'Python Master', icon: 'Medal', dateCompleted: '2 days ago', color: 'text-yellow-600' },
      { name: 'First ML Model', icon: 'Trophy', dateCompleted: '1 week ago', color: 'text-green-600' },
      { name: 'Data Wizard', icon: 'Star', dateCompleted: '2 weeks ago', color: 'text-blue-600' },
    ]
  };

  const progress = userProgress || mockProgress;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Overall Progress */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Course Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(progress.courses).map(([courseName, progressValue]) => (
                <div key={courseName}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{courseName}</span>
                    <span className="text-sm font-medium text-primary">{progressValue}%</span>
                  </div>
                  <Progress value={progressValue} className="h-3" />
                </div>
              ))}
            </div>

            {/* Learning Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{progress.stats.labsCompleted}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Labs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{progress.stats.projectsBuilt}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{progress.stats.timeInvested}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time Invested</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements & Badges */}
      <div className="space-y-6">
        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progress.achievements.map((achievement, index) => {
                const IconComponent = achievement.icon === 'Medal' ? Medal : 
                                   achievement.icon === 'Trophy' ? Trophy : Star;
                
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${achievement.color.split('-')[1]}-100 rounded-full flex items-center justify-center`}>
                      <IconComponent className={`${achievement.color} h-5 w-5`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{achievement.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.dateCompleted}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Learning Streak */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2 flex items-center justify-center">
                <Flame className="h-8 w-8 mr-2" />
                {progress.streak}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mb-4">Days in a row!</div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="w-6 h-6 bg-orange-500 rounded-sm"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
