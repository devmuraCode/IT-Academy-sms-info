//TYPES
export type AuthorizationType = {
    username: string;
    password: string;
};

export type UserType = {
    id: number
    user_id: number;
    groups: GroupType[]
    first_name: string;
    surname: string;
    last_name: string;
    username: string;
    gender: string;
    telegram?: string;
    homework_done: boolean
    is_available: boolean
    dob: string;
    photo?: string;
    group: number
    student: number
    phone?: string
    email: string
    work: boolean;
    study: boolean;
    paid_by_parents: boolean;
    token: string;
    old_password?: string;
    password?: string;
    password2?: string;
    role: string;
    parent: number[] | [];
};

export type MonthsType = {
    id: number;
    name: string;
    lessons: Array<LessonsType>;
};

export type LessonsType = {
    id: number;
    name: string;
    date: string
    ended: boolean
};

export type GroupType = {
    id: number;
    name: string;
    teacher_id: number;
    duration_hours: number;
    start_time: string;
    specialty_id: number;
    specialty: number;
    specialty_name: string;
    even: boolean;
    teacher_name: string
    teacher: string
    duration_monthes: number;
    groupmonth: MonthsType[];
    students_num: number;
};

export type CreateGroupType = {
    id: number
    name: string,
    specialty: string,
    start_time: string
    time: number
    even: boolean
    duration: number
    teacher: string
};

export type SpecialityType = {
    id: number
    created_at: string
    name: string
}

export type CreateSpecialtyType = {
    name: string
}

export type CreateMonthType = {
    id: number
    group: number
    name: string
    month?: string
}

export type AddStudentGroupType = {
    group: number,
    student: string[]
}

export type CreateLessonsType = {
    groupmonth: number,
    date: string[]
}

export type PostReportCardType = {
    id: number,
    students: UserType[]
}

export type UpdateUserRoleType = {
    id: number,
    role: string,
}