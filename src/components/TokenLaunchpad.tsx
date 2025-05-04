import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"


export function TokenLaunchpad() {
  const { connection } = useConnection();
    const wallet = useWallet();

    async function createToken() {
        const mintKeypair = Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        if (!wallet.publicKey) {
            throw new Error("Wallet is not connected");
        }

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(mintKeypair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID)
        );
            
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
    }


  return (
    <div className="flex gap-4 flex-col items-center justify-center w-full">
      <Input className="w-[300px]" placeholder="Name of Token" type="text"></Input>
      <Input className="w-[300px]" placeholder="Symbol of Token" type="text"></Input>
      <Input className="w-[300px]" placeholder="Image url of Token" type="text"></Input>
      <Input className="w-[300px]" placeholder="Initial Supply" type="number"></Input>
      <Button onClick={createToken}>Create a Token</Button>
    </div>
  )
}
