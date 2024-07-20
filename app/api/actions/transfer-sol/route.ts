import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { transferSolTransaction } from "./transaction";

export const GET = async (req: Request) => {
    const payload: ActionGetResponse = {
        title: "Dice Roll Game",
        icon: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDM1bDExOGIyZHZlejVqYnlkZjJyMGVmaGs2Ynp0YWd2b2lyaHQxZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7JzIg2js3i66EZ0W2G/giphy.gif",
        description: "Test your luck here!",
        label: "Bet would be .5 Sol 🟥⬛️",
        links:{
            actions:[
                {
                    label: "1",
                    href: ""
                },
                {
                    label: "2",
                    href: ""
                },
                {
                  label: "3",
                    href: "",
                },
                {
                    label: "4",
                      href: "",
                  },
                {
                  label: "5",
                    href: "",
                },
                {
                    label: "6",
                      href: "",
                  },
            ]
        }
    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}

export const OPTIONS = GET;

export const POST = async (req: Request) => {
    const body: ActionPostRequest = await req.json();
    const transaction = await transferSolTransaction({ from: body.account, amount: 0.5 })

    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: `Goodluck`,
        },
    });
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}