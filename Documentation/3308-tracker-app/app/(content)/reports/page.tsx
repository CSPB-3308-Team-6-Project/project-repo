import { ITracker } from '@/types/tracker/tracker'

export default function ReportsPage() {

    // const mockData = [
    //   { emotion: "Angry", rating: 3 },
    //   { emotion: "Excited", rating: 8 },
    //   { emotion: "Lonely", rating: 4 },
    //   { emotion: "Restful", rating: 7 }
    // ]
  
    const mockData: ITracker = {
      id: "tracker-1",
      title: "My Mood Tracker",
      trackerPosts: [
          { id: "post-1", rating: 3, emotion: "Angry", recordedAt: new Date("2026-03-01") },
          { id: "post-2", rating: 8, emotion: "Excited", recordedAt: new Date("2026-03-02") },
          { id: "post-3", rating: 4, emotion: "Lonely", recordedAt: new Date("2026-03-03") },
          { id: "post-4", rating: 7, emotion: "Restful", recordedAt: new Date("2026-03-04") },
      ]
    }
    
    return (
      <div>
  
        <h1 className="text-3xl font-bold mb-4">Reports</h1>
  
        <p>This page will show mood trends and statistics.</p>
  
        <ul className="mt-6 space-y-2">
          {mockData.trackerPosts.map((entry, i) => (
            <li key={i}>
              {entry.emotion} — {entry.rating}/10
            </li>
          ))}
        </ul>
  
      </div>
    )
  }