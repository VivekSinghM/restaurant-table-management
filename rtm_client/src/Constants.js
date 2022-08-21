
export const server_URI="https://rt-server1.herokuapp.com" //deployed server
// export const server_URI="http://127.0.0.1:5000" //local
export let header = { Accept: "appliation/json", "Content-type": "appliation/json" };
export const setHeader = newHeader => header = newHeader
export const AKData = "AKData";
export const userTypes = {
    anonymous: "Anonymous",
    staff: "Staff",
    customer: "Customer"
}
const tableData = {}

// export const inisitalData = tableData
export const inisitalData = {}
