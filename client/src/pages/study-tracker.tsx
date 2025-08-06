import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlassCup } from "@/components/glass-cup";
import { useStudyTracker } from "@/hooks/use-study-tracker";
import { GraduationCap } from "lucide-react";

export default function StudyTracker() {
  const {
    state,
    formatTime,
    getWeeklyTotal,
    addTime,
    nextWeek,
    createNewWeek,
    resetAllWeeks,
    switchToWeek,
    getCurrentMonth,
    getDayProgress,
    getWeeklyProgress,
    getMonthlyProgress,
  } = useStudyTracker();

  const weekDays = [
    { key: 'monday', label: 'Seg' },
    { key: 'tuesday', label: 'Ter' },
    { key: 'wednesday', label: 'Qua' },
    { key: 'thursday', label: 'Qui' },
    { key: 'friday', label: 'Sex' },
    { key: 'saturday', label: 'Sab' },
    { key: 'sunday', label: 'Dom' },
  ] as const;

  const weeklyTotal = getWeeklyTotal();
  const weeklyProgressPercent = getWeeklyProgress();
  const monthlyProgressPercent = getMonthlyProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[var(--study-blue)] text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-[var(--study-blue)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Rastreador de Estudos</h1>
            <p className="text-blue-100 text-sm">Monitore seu progresso semanal</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Current Week Progress */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Progresso da Semana Atual</h3>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-700">{formatTime(weeklyTotal)}</div>
                  <div className="text-sm text-gray-500">/ 12h</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {Math.round(weeklyProgressPercent)}% da meta semanal alcançada
                  </div>
                </div>
                
                {/* Weekly Glass Cup */}
                <div className="flex justify-center mb-4">
                  <GlassCup fillPercentage={weeklyProgressPercent} size="large" />
                </div>
                
                {/* Goals Display */}
                <div className="grid grid-cols-2 gap-4 text-center bg-gray-50 rounded-lg p-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600">Meta Semanal</div>
                    <div className="text-lg font-bold text-[var(--study-blue)]">12h</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Meta Mensal</div>
                    <div className="text-lg font-bold text-[var(--study-blue)]">48h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Week Controls */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Controles de Semana</h3>
                <div className="space-y-3">
                  <Button 
                    onClick={nextWeek}
                    className="w-full bg-[var(--study-blue)] hover:bg-[var(--study-blue)]/90 text-white font-medium py-3"
                  >
                    Próxima Semana
                  </Button>
                  <Button 
                    onClick={createNewWeek}
                    variant="outline"
                    className="w-full font-medium py-3"
                  >
                    Nova Semana
                  </Button>
                  <Button 
                    onClick={resetAllWeeks}
                    variant="destructive"
                    className="w-full font-medium py-3"
                  >
                    Resetar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 2: Weekly Schedule */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cronograma Semanal</h3>
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="flex justify-center items-center gap-2">
                  {/* Previous Week */}
                  {state.currentWeek > 1 && (
                    <button
                      onClick={() => switchToWeek(state.currentWeek - 1)}
                      disabled={state.viewingWeek === state.currentWeek - 1}
                      className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                        state.viewingWeek === state.currentWeek - 1
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-white cursor-pointer'
                      }`}
                    >
                      Semana {state.currentWeek - 1}
                    </button>
                  )}
                  {/* Current Week */}
                  <button
                    onClick={() => switchToWeek(state.currentWeek)}
                    disabled={state.viewingWeek === state.currentWeek}
                    className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                      state.viewingWeek === state.currentWeek
                        ? 'bg-[var(--study-blue)] text-white cursor-not-allowed'
                        : 'bg-blue-300 text-blue-800 hover:bg-[var(--study-blue)] hover:text-white cursor-pointer'
                    }`}
                  >
                    Semana {state.currentWeek}
                  </button>
                </div>
                
                {/* Viewing Indicator */}
                <div className="text-center mt-2">
                  <span className="text-xs text-gray-600">
                    {state.viewingWeek === state.currentWeek 
                      ? 'Visualizando semana atual' 
                      : `Visualizando Semana ${state.viewingWeek}`
                    }
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {weekDays.map(({ key, label }) => {
                  const dayMinutes = state.weeklyMinutes[key];
                  const isGoalMet = dayMinutes >= 360; // 6h daily goal
                  
                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          isGoalMet ? 'bg-[var(--study-green)]' : 'bg-[var(--study-red)]'
                        }`} />
                        <span className="font-medium text-gray-700">{label}</span>
                        <span className="text-gray-600 text-sm">{formatTime(dayMinutes)}</span>
                      </div>
                      <Button
                        onClick={() => addTime(key)}
                        disabled={state.viewingWeek !== state.currentWeek}
                        className={`btn-add-time text-sm font-medium px-3 py-1 h-auto ${
                          state.viewingWeek !== state.currentWeek
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[var(--study-blue)] hover:bg-[var(--study-blue)]/90 text-white'
                        }`}
                      >
                        +30min
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Column 3: Daily Progress & History */}
          <div className="space-y-6">
            {/* Daily Progress */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Progresso Diário - {getCurrentMonth()}
                </h3>
                <div className="text-sm text-gray-600 mb-4">
                  Meta mensal: <span className="font-medium">48 horas totais</span> • 
                  Progresso atual: <span className="font-bold text-[var(--study-blue)]">
                    {formatTime(state.monthlyMinutes)}
                  </span>
                </div>
                
                {/* Daily Cups Grid */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekDays.map(({ key, label }) => {
                    const dayMinutes = state.weeklyMinutes[key];
                    const dayProgress = getDayProgress(key);
                    
                    return (
                      <div key={key} className="text-center">
                        <div className="text-xs text-gray-500 mb-2">{label}</div>
                        <div className="flex justify-center">
                          <GlassCup fillPercentage={dayProgress} size="small" />
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{formatTime(dayMinutes)}</div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Legend */}
                <div className="flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[var(--study-green)] rounded-full" />
                    <span className="text-gray-600">Meta do Dia Atingida (6h+)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[var(--study-red)] rounded-full" />
                    <span className="text-gray-600">Meta do Dia Incompleta (&lt;6h)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly History */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Resumo das Semanas - {getCurrentMonth()}
                </h3>
                
                <div className="space-y-3">
                  {state.weekHistory.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      Nenhuma semana concluída ainda
                    </div>
                  ) : (
                    state.weekHistory.map((item) => (
                      <div key={item.week} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[var(--study-blue)] text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {item.week}
                          </div>
                          <div>
                            <div className="font-medium text-gray-700">Semana {item.week}</div>
                            <div className="text-xs text-gray-500">{item.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-700">{formatTime(item.minutes)}</div>
                          <div className="text-xs text-gray-500">
                            {Math.round((item.minutes / 720) * 100)}% da meta
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Monthly Total */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total de {getCurrentMonth()}:</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-700">{formatTime(state.monthlyMinutes)}</span>
                      <span className="text-gray-500"> / 48h</span>
                      <div className="text-xs text-gray-500">
                        {Math.round(monthlyProgressPercent)}% da meta mensal
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
