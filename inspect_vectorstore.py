import pickle
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

DB_FAISS_PATH = "vectorstore/db_faiss"

def inspect_vector_store():
    """
    Loads the FAISS vector store and prints its contents.
    """
    try:
        # Load the embedding model (must be the same one used to create the store)
        embedding_model = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
        
        # Load the FAISS database from the local directory
        print("Loading vector store...")
        db = FAISS.load_local(
            DB_FAISS_PATH, 
            embedding_model, 
            allow_dangerous_deserialization=True  # Required for loading .pkl files
        )
        print("Vector store loaded successfully.")
        
        # The documents are stored in the 'docstore' attribute
        # We access it through the index_to_docstore_id map
        docstore = db.docstore._dict
        
        if not docstore:
            print("\nThe vector store is empty.")
            return
            
        print(f"\n--- Found {len(docstore)} documents in the vector store ---\n")
        
        # Loop through each document and print its content and metadata
        for i, doc_id in enumerate(db.index_to_docstore_id.values()):
            doc = docstore[doc_id]
            print(f"--- Document {i + 1} ---")
            print(f"Source: {doc.metadata.get('source', 'N/A')}")
            print(f"Page: {doc.metadata.get('page', 'N/A')}")
            print("\nContent:")
            print(doc.page_content)
            print("\n" + "="*50 + "\n")

    except FileNotFoundError:
        print(f"Error: Could not find the vector store at '{DB_FAISS_PATH}'.")
        print("Please make sure you have run 'create_memory_for_llm.py' first.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    inspect_vector_store()