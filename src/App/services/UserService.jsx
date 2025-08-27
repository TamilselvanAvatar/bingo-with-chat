import { useState } from 'react';
import axios from 'axios'

const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

export function fetchUser() {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getToken = (loginInfo) => {
        setLoading(true)
        setError(null);
        try {
            const apiCall = axios.post(`${API_SERVER_URL}/user/login`, loginInfo)
            apiCall.then(response => {
                setUserData(response.data)
                console.log(userData)
            }).catch(err => {
                setError(err.response.data)
                console.log(error)
            })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    return [userData, loading, error, getToken];
}

export function fetchLeaderBoard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const fetchRankDetails = ({ currentUserPoints = 0, id }) => {
        setLoading(true)
        setError(null);
        try {
            const apiCall = axios.get(`${API_SERVER_URL}/user/getLeaderBoard`, { params: { points: currentUserPoints, id: id } })
            apiCall.then(response => {
                setData(response?.data?.data)
                console.log(response?.data?.data)
            }).catch(err => {
                setError(err.response.data)
                console.log(error)
            })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return [data, loading, error, fetchRankDetails]
}