import IQuiz from "../types/IQuiz";
import IStep from "../types/IStep";
import { instance } from "./auth";


export const useCreateQuiz = async (title: string, categoryName: string, mainColor: string, textColor: string, listColor: string, body: IStep[]): Promise<any> => {

    try {
        await instance.post('quiz/create', {
            title,
            textColor,
            listColor,
            mainColor,
            categoryName,
            body
        }).then(res => console.log(res.data));

    } catch (error) {
        console.log(error);
    }
}

export const useGetQuizzes = async (): Promise<any> => {
    try {
        const res = await instance.post('/quiz/allQuizzes');

        return res.data;
    } catch (error) {
        return console.log(error)
    }
}

export const GetQuiz = async (id: string): Promise<IQuiz> => {
    const res = await instance.post(`quiz/get/${id}`);

    return res.data;
}

export const deleteQuiz = async (userId: string, quizId: string, index: number): Promise<string> => {
    const res = await instance.post('/quiz/delete', {
        quizId,
        userId,
        index
    });

    return res.data
}

export const getIdeas = async (): Promise<Array<IQuiz>> => {
    const res = await instance.get('/quiz/ideas');

    return res.data;
}

