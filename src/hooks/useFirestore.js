import { collection, onSnapshot,query, where,orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useState } from "react";

const useFirestore = (collect,condition) => {
    const [documents, setDocuments] = useState([]);
//    console.log({condition});
//     React.useEffect(() => {
//         let collectionRef = (collection(db, collect));
//         if(condition){
//             if(!condition.compareValue){
//                 return;
//             }
           
//             collectionRef = query(collection(db,collect), where(condition.fieldName, condition.operator, condition.compareValue));
//         }
//         const unsubcribe = onSnapshot(collectionRef,(snapshot)=>{
//             const documents = snapshot.docs.map((doc) => ({
//                 ...doc.data(),
//                 id: doc.id,
//             }))
//             setDocuments(documents);
//         })
//         return unsubcribe;
//     },[collect,condition]);
//     return documents;
// }
console.log({condition});
React.useEffect(() => {
    let collectionRef = (collection(db, collect));
    if(condition){
        if(!condition.compareValue){
            return;
        }
        
        collectionRef = query(collection(db,collect), where(condition.fieldName, condition.operator, condition.compareValue), orderBy("createdAt"));
    }
    const unsubcribe = onSnapshot(collectionRef,(snapshot)=>{
        console.log({snapshot});
        const documents = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
        setDocuments(documents);
    })
    return unsubcribe;
}, [collect,condition]);
console.log({documents});
return documents;
}
export default useFirestore;


