'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Faq() {
  return (
    <div className="w-full mx-2">
      <div className="text-center text-xl">Frequently Asked Questions</div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger><div className="mr-2">What is the Schengen 90/180 rule?</div></AccordionTrigger>
          <AccordionContent>
            Under the terms of Schengen, non-EEA nationals cannot spend more
            than a total of 90 days within a total period of 180 days without a
            visa.
            <br />
            <br />
            Furthermore, once you’ve used up your quota of 90 days, you cannot
            return to Schengen until 90 more days have passed. For example, if
            you enter Spain on January 1st and spend 90 days in the country
            until June 30th, you cannot return to Spain until at least the end
            of September.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger><div className="mr-2">What Is Schengen?</div></AccordionTrigger>
          <AccordionContent>
            Schengen is the name given to the group of EEA countries including
            Spain that allows border-free travel within it. Almost all EU
            countries form part of Schengen.
            <br />
            <br />
            Citizens who are EU nationals can travel within the area visa-free
            and with no restrictions on the amount of time they spend in each
            country. Non-EEA nationals can travel to Schengen without a visa,
            but they cannot stay for longer than 90 days in 180.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="mr-2">
              Is this an official Schengen calculator?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            No, this calculator is just a helping tool to try to assist you in
            keeping within the 90/180 rule.
            <br />
            <br />
            This site and the contents within offers no guarantee of it&apos;s accuracy of calculation
            or accuracy for keeping up to date with the European Economic Area immigration law, this
            site and contents within does not represent any EU member nor does it constitute any legal advice.
            <br />
            <br />
            Always consult a qualified immigration lawyer when planning to cross any border.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
