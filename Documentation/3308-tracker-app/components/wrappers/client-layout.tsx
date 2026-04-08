'use client'

import BaseWrapper from './base-wrapper'
import { LoadingProvider } from '../providers/loading-provider'

export default function ClientLayout({
    children
}: {
    children: React.ReactNode
}) {
    
    return (
        <LoadingProvider>
            <BaseWrapper>
                {children}
            </BaseWrapper>
        </LoadingProvider>
    )
}
