/**
 * @returns true if user is authenticated else false
 */
export const getAuth = async () => {
    const response = await fetch('/api/verify')
    const data = await response.json()
    return data.ok
}