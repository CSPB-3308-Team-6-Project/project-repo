import { IUser } from '@/types/user/user'

export default function ProfilePage() {

    // const mockUser = {
    //   name: "Test User",
    //   email: "test@email.com",
    //   dob: "3/21/2000",
    //   joined: "1/1/2026"
    // }
    const mockUser: IUser = {
      id: 1,
      name: "Test User",
      email: "test@email.com",
      cuID: "cu123",
      trackerIDs: [],
      createdAt: new Date("2026-01-01")
    }
  
    return (
      <div>
  
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
  
        <p>This page shows information about the logged in user.</p>
  
        <div className="mt-6 border p-4 rounded">
  
          <p><strong>Name:</strong> {mockUser.name}</p>
          <p><strong>Email:</strong> {mockUser.email}</p>
          <p><strong>Member Since:</strong> {mockUser.createdAt.toLocaleDateString()}</p>
  
        </div>
  
      </div>
    )
  }