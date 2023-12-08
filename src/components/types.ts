interface Lecturer {
    uuid: string | undefined;
    title_before: string | undefined;
    first_name: string;
    middle_name: string | undefined;
    last_name: string | undefined;
    title_after: string | undefined;
    picture_url: string | undefined;
    location: string | undefined;
    claim: string | undefined;
    bio: string | undefined;
    tags: Tag[] | undefined;
    price_per_hour: number | undefined;
    contact: Contact | undefined;
}

interface Tag {
    name: string;
    uuid: string;
}

interface Contact {
    telephone_numbers: string[];
    emails: string[];
}
