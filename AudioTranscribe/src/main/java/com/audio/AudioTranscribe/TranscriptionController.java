package com.audio.AudioTranscribe;


import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.audio.transcription.AudioTranscriptionResponse;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/transcribe")
public class TranscriptionController {

    private final OpenAiAudioTranscriptionModel TranscriptionModel;

    public TranscriptionController(OpenAiAudioTranscriptionModel transcriptionModel) {
        this.TranscriptionModel = transcriptionModel;
    }

    @PostMapping
    public ResponseEntity<String> transcribeAudio(
            @RequestParam("file") MultipartFile file
            ) throws IOException {
        File tempFile=File.createTempFile("audio",".wav");

        file.transferTo(tempFile);

         OpenAiAudioTranscriptionOptions transcriptionOptions= OpenAiAudioTranscriptionOptions.builder()
                                .responseFormat(OpenAiAudioApi.TranscriptResponseFormat.TEXT)
                                .language("en")
                                .temperature(0f)
                                .build();

        FileSystemResource audioFile=new FileSystemResource(tempFile);

        AudioTranscriptionPrompt transcriptionPrompt= new AudioTranscriptionPrompt(audioFile,transcriptionOptions);
        AudioTranscriptionResponse response=TranscriptionModel.call(transcriptionPrompt);

        tempFile.delete();
        return new ResponseEntity<>(response.getResult().getOutput(), HttpStatus.OK);
    }

}
