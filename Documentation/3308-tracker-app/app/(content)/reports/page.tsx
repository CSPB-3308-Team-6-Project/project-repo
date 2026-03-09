export default function ReportsPage() {

    const mockData = [
      { emotion: "Angry", rating: 3 },
      { emotion: "Excited", rating: 8 },
      { emotion: "Lonely", rating: 4 },
      { emotion: "Restful", rating: 7 }
    ]
  
    return (
      <div>
  
        <h1 className="text-3xl font-bold mb-4">Reports</h1>
  
        <p>This page will show mood trends and statistics.</p>
  
        <ul className="mt-6 space-y-2">
          {mockData.map((entry, i) => (
            <li key={i}>
              {entry.emotion} — {entry.rating}/10
            </li>
          ))}
        </ul>
  
      </div>
    )
  }