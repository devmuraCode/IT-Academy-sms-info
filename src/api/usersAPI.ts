import {
    AddStudentGroupType,
    AuthorizationType,
    CreateGroupType,
    CreateLessonsType,
    CreateMonthType,
    CreateSpecialtyType,
    GroupType,
    LessonsType,
    MonthsType,
    PostReportCardType,
    SpecialityType,
    UpdateUserRoleType,
    UserType
} from "../types/types";
import instance from "./config";

export const usersAPI = {
    login(data: AuthorizationType) {
        return instance.post<UserType>(`login/`, data).then((response) => {
            return response
        })
    },

    logout() {
        return instance.post<void>(`logout/`).then((response) => {
            return response
        })
    },

    getAllUsers() {
        return instance.get<UserType[]>(`user/`).then((response) => {
            return response.data
        })
    },

    getUserDetail(id: number) {
        return instance.get<UserType>(`user/${id}/`).then((response) => {
            return response
        })
    },

    createStudent(data: UserType) {
        return instance.post<UserType>(`signup/`, data).then((response) => {
            return response
        })
    },

    createGroup(data: CreateGroupType) {
        return instance.post<GroupType>(`group/`, data).then((response) => {
            return response
        })
    },

    getAllGroups() {
        return instance.get<GroupType[]>(`group/`).then((response) => {
            return response
        })
    },

    getGroupDetail(id: number) {
        return instance.get<GroupType>(`group/${id}/`).then((response) => {
            return response
        })
    },

    updateGroup(data: GroupType) {
        return instance.patch<GroupType>(`group/${data.id}/`, data).then((response) => {
            return response
        })
    },

    getSpecialty() {
        return instance.get<SpecialityType[]>(`specialty/`).then((response) => {
            return response.data
        })
    },

    createSpecialty(data: CreateSpecialtyType) {
        return instance.post<SpecialityType>(`specialty/`, data).then((response) => {
            return response.data
        })
    },

    getGroupMonth() {
        return instance.get<MonthsType[]>(`groupmonth/`).then((response) => {
            return response.data
        })
    },

    createGroupMonth(data: CreateMonthType) {
        return instance.post<MonthsType>(`groupmonth/`, data).then((response) => {
            return response.data
        })
    },

    updateGroupMonth(data: CreateMonthType) {
        return instance.patch<MonthsType>(`/groupmonth/${data.id}/`, data).then((response) => {
            return response.data
        })
    },

    getProfile() {
        return instance.get<UserType>(`profile/`).then((response) => {
            return response.data
        })
    },

    getMonthDetail(id: number) {
        return instance.get<LessonsType[]>(`/lesson/?groupmonth=${id}`).then((response) => {
            return response.data
        })
    },

    addStudentGroup(data: AddStudentGroupType) {
        return instance.post<UserType[]>(`/group_student/`, data).then((response) => {
            return response.data
        })
    },

    getStudentGroup(id: number) {
        return instance.get<UserType[]>(`/group_student/?students_to_add=${id}`).then((response) => {
            return response.data
        })
    },

    createLessons(data: CreateLessonsType) {
        return instance.post<LessonsType[]>(`/lesson/`, data).then((response) => {
            return response.data
        })
    },

    getGroupStudents(id: number) {
        return instance.get<UserType[]>(`/lesson_student/${id}`).then((response) => {
            return response.data
        })
    },

    getStudents() {
        return instance.get<UserType[]>(`/student/`).then((response) => {
            return response.data
        })
    },

    getTeachers() {
        return instance.get<UserType[]>(`/teacher/`).then((response) => {
            return response.data
        })
    },

    getPayers() {
        return instance.get<UserType[]>(`/payer/`).then((response) => {
            return response
        })
    },

    postReportCard(data: PostReportCardType) {
        return instance.post<UserType[]>(`/lesson_student/${data.id}/`, data).then((response) => {
            return response.data
        })
    },

    sendSMS(id: number) {
        return instance.post<UserType[]>(`/send_sms/${id}/`).then((response) => {
            return response.data
        })
    },

    deleteUser(id: number) {
        return instance.delete<UserType>(`/user/${id}/`).then((response) => {
            return response.data
        })
    },

    updateUser(data: UserType) {
        return instance.patch<UserType>(`/user/${data.id}/`, data).then((response) => {
            return response.data
        })
    },

    deleteSpecialty(id: number) {
        return instance.delete<UserType>(`/specialty/${id}/`).then((response) => {
            return response.data
        })
    },

    updateUserRole(data: UpdateUserRoleType) {
        return instance.patch<UserType>(`/user/${data.id}/`, data).then((response) => {
            return response.data
        })
    },
    updateSpecialty(data: SpecialityType) {
        return instance.patch<SpecialityType>(`/specialty/${data.id}/`, data).then((response) => {
            return response.data
        })
    },
}