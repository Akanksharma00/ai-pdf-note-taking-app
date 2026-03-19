import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { NextResponse } from "next/server";

// const pdfURL = "https://jovial-echidna-485.convex.cloud/api/storage/3a596155-8d1e-4ade-8eb1-e48272e1d0eb";

export async function GET(request: Request) {
    try {
        const reqUrl = request.url;
        const { searchParams } = new URL(reqUrl);
        const pdfURL = searchParams.get('pdfURL') ?? '';
        // 1. Load PDF file 
        const response = await fetch(pdfURL);
        const blob = await response.blob();
        const loader = new PDFLoader(blob);
        // Load the data
        const docs = await loader.load();
        // Merge all pdfContent into a single string
        let pdfTextContent = "";
        docs.forEach((doc) => {
            pdfTextContent = pdfTextContent + doc.pageContent
            }
        );

        // 2. Split the text into smaller chunks
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const output = await splitter.createDocuments([pdfTextContent]);

        const splitterList: string[] = [];
        output.forEach(docs => {
            splitterList.push(docs.pageContent);
        })
        
        return NextResponse.json({ result: splitterList });
    } catch (error) {
        console.error("PDF loading error:", error);
        return NextResponse.json(
            { error: "Failed to load PDF", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}