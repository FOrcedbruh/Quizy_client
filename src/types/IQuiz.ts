import IStep from "./IStep";

export default interface IQuiz {
    mainColor: string,
    textColor: string,
    listColor: string,
    users: [string],
    categoryName: string,
    _id: string,
    title: string,
    body: IStep[]
}