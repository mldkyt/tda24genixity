
interface Lecturer {
    uuid: string;
    title_before: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    title_after: string;
    picture_url: string;
    location: string;
    claim: string;
    bio: string;
    tags: Tag[];
    price_per_hour: number;
    contact: Contact;   
}

interface Tag {
    name: string;
    uuid: string;
}

interface Contact {
    telephone_numbers: string[];
    emails: string[];
}