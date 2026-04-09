'use client'

import { Button } from '@mantine/core';
import { useState } from 'react';
import { toast } from 'sonner';
import { createEntry } from '../../tracking/(steph)/create/actions';
import { seedTrackerPosts } from '@/lib/seed-data';
import { ITracker } from '@/types/tracker/tracker';

export default function SeedDataButton({ email, trackers }: { email: string | null, trackers: ITracker[] | null }) {
    const [isSeeding, setIsSeeding] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleSeedData = async () => {
        if (!email) {
            toast.error('No user email found');
            return;
        }

        setIsSeeding(true);
        setProgress(0);
        
        try {
            let successCount = 0;
            let failCount = 0;

            for (let i = 0; i < seedTrackerPosts.length; i++) {
                const post = seedTrackerPosts[i];
                
                const result = await createEntry({
                    rating: post.rating,
                    emotion: post.emotion,
                    date: post.date,
                    email: email,
                    trackers: trackers
                });

                if (result.success) {
                    successCount++;
                } else {
                    failCount++;
                }

                setProgress(Math.round(((i + 1) / seedTrackerPosts.length) * 100));
                
                // Small delay to avoid overwhelming the database
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            toast.success(`Seeding complete! ${successCount} entries created, ${failCount} failed.`);
        } catch (error) {
            console.error('Seeding error:', error);
            toast.error('Failed to seed data');
        } finally {
            setIsSeeding(false);
            setProgress(0);
        }
    };

    return (
        <Button 
            onClick={handleSeedData} 
            loading={isSeeding}
            color="grape"
            disabled={isSeeding}
        >
            {isSeeding ? `Seeding... ${progress}%` : 'Seed Database (60 entries)'}
        </Button>
    );
}
