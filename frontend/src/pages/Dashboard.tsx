import { useState, useEffect } from 'react'
import { getHealth } from '../services/api'

type HealthResponse =  {
    status: string; 
    service: string;
    version: string;
}

const dashboard = () => {
    const [health, setHealth] = useState<HealthResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchHealth() {
            try {
                const data = await getHealth();
                setHealth(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch health data");
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        fetchHealth();
    }, [])

    useEffect(() => {

        console.log(health)

    }, [health])


  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
        <h1>Dashboard</h1>
        <p>Backend Status</p>
        <p>Status: {health?.status}</p>
        <p>Service: {health?.service}</p>
        <p>Version: {health?.version}</p>
    </div>
  )
}

export default dashboard