import { useContext, useEffect } from 'react'
import { UserContext } from '../helperComponent/UserContext'
import { useParams } from 'react-router-dom'

export function Dashboard(props) {
    const { user } = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {
        console.log(user);
        console.log(id);
    }, [])
    return (<div>Dashboard</div>)
}