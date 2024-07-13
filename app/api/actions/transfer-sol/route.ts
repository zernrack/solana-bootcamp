import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { PublicKey } from "@solana/web3.js";
import { transferSolTransaction } from "./transaction";


export const GET = async (req: Request) => {


    const payload: ActionGetResponse = {
        title: "Transfer 1 SOL",
        icon: "https://raw.githubusercontent.com/solana-developers/solana-actions/main/examples/next-js/public/solana_devs.jpg",
        description: "Transfer SOL to another wallet",
        label: "Give 1 SOL"
    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
      });
}

export const OPTIONS = GET;

export const POST = async (req: Request) => {
    const body: ActionPostRequest = await req.json();

    // const requestUrl = new URL(req.url);
    // requestUrl.searchParams.get("amount")
    // const account  = new PublicKey(body.account);

    const transaction = await transferSolTransaction({ from: body.account, amount: 1 })

    const payload: ActionPostResponse = await createPostResponse({
        fields: {
          transaction,
          message: `Send 1 SOL`,
        },
      });
      return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
      });
}