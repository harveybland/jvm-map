export interface UserProps {
    userData: UserDataProps[];
}

export interface UserDataProps {
    id: number;
    funder: string;
    lat: number;
    lng: number;
    url: string;
}