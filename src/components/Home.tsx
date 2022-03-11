import React, { useState, useEffect } from 'react';
import VocabularyBuilder from './VocabularyBuilder/VocabularyBuilder';
import NewVocabulary from './VocabularyBuilder/NewVocabulary/NewVocabulary';
import StickyNote from './GeneralNotes/StickyNote';
import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { getVocabularyData, postVocabulary } from '../services/AppService';

interface Words {
  id: number;
  word: string;
  meaning: string;
}
export const Home = () => {

    const DUMMY_WORDS = [
        { id: 0, word: "sequester", meaning: "to set or keep apart from others , cut off, insulate, isolate" },
        { id: 1, word: "travesty", meaning: "a poor, insincere, or insulting imitation of something , caricature, cartoon, farce" }
      ];

    const [words, setWords] = useState<Words[]>([]);

    useEffect(() => {
      getVocabulary();
    }, [])
  
    const getVocabulary = () => {
      getVocabularyData().then((response) => {
        console.log(response);
        setWords(response.data);
      });
    };

    const addHandler = (wordObject: any) => { 
      postVocabulary(wordObject.word, wordObject.meaning).then((response) => {
        const wordObjectId = {
          ...wordObject,
          id: response.data.id,
        };
        console.log(wordObjectId);
        setWords([...words, wordObjectId]);
      });
    };


    return (
      <div>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <NewVocabulary onAddWord={addHandler}></NewVocabulary>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <StickyNote></StickyNote>
            </Card>
          </Grid>
          <Grid item xs={6} md={12}>
            <VocabularyBuilder wordsList={words}></VocabularyBuilder>
          </Grid>
        </Grid> */}
        <NewVocabulary onAddWord={addHandler}></NewVocabulary>
        <VocabularyBuilder wordsList={words}></VocabularyBuilder>
        <StickyNote></StickyNote>
      </div>
    );
}

