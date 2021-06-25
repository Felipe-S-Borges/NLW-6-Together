import {useHistory, useParams} from 'react-router-dom';
import '../styles/room.scss';
import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useEffect } from 'react';
import { type } from 'os';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { async } from 'q';




type RoomParams = {
    id:string;
}

export function AdminRoom(){

   // const {user} = useAuth();
   const history = useHistory();
    const params = useParams<RoomParams>();
    //const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;
    const {title,questions} = useRoom(roomId);

async function handleEndRoom() {

   await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
    })
    history.push('/')

    
}

 async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir esta pergunta')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined> Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>
                
                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            
                            >
                                <button
                                    type="button"
                                    onClick={()=>{handleDeleteQuestion(question.id)}}
                                >
                                    <img src={deleteImg} alt="Deletar" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}