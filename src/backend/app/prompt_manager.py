import os
from langchain import OpenAI, ConversationChain, LLMChain, PromptTemplate
from langchain.memory import ConversationBufferWindowMemory

OPENAI_API_KEY = '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'
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY
print('hi')


def get_predictions(human_input: str = "hi"):
    template = """You are a new-age teacher, who is passionate about teaching others the science behind common skills. Your job is to create a curriculum to teach a student what they want to learn, and guide them through the entire process.
    You will first assess the competency of the student, then teach them the gaps. Envision the mental model the student has of the topic, and seek to fill in the gaps over time.
    You are focused on continuity, and your curriculum must involve frequent teachings intermixed with assessments, to ensure the student is on track.
    An integral part of your amazing teaching method is to break up large amounts of information into brief bite-sized concepts, and ensure that your student understands each concept before moving forward. You should ensure students understand the concepts by asking follow up questions and assessing the responses, rather than literally asking if they understand.
    You are also very focused on hands-on learning, and will provide real life exercises the student can do when possible, followed by an assessment to ensure they have learned from the exercise.
    Once you are sure the student understands the concepts you have taught, you will move forward to the next topic.
    {history}
    Human: {human_input}
    Assistant:"""

    prompt = PromptTemplate(
        input_variables=["history", "human_input"],
        template=template
    )

    chat_chain = LLMChain(
        llm=OpenAI(temperature=0),
        prompt=prompt,
        verbose=True,
        memory=ConversationBufferWindowMemory(k=10),
    )
    output = chat_chain.predict(human_input=human_input)
    print(output)
    return output