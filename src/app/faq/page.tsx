'use client';

import Link from 'next/link';
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
          <AccordionTrigger>
            <div className="mr-2 text-lg">What is the Schengen 90/180 rule?</div>
          </AccordionTrigger>
          <AccordionContent className="mb-8">
            Under the terms of Schengen, non-EEA nationals cannot spend more
            than a total of 90 days within a total period of 180 days without a
            visa.
            <br />
            <br />
            Furthermore, once you&apos;ve used up your quota of 90 days, you cannot
            return to Schengen until 90 more days have passed. For example, if
            you enter Spain on January 1st and spend 90 days in the country
            until June 30th, you cannot return to Spain until at least the end
            of September.
            <br />
            <br />
            Note: By the time you read this, the law may have changed. Always consult a
            qualified immigration lawyer when planning to cross any border.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="mr-2 text-lg">What Is Schengen?</div>
          </AccordionTrigger>
          <AccordionContent className="mb-8">
            Schengen is the name given to the group of EEA countries including
            Spain that allows border-free travel within it. Almost all EU
            countries form part of Schengen.
            <br />
            <br />
            Citizens who are EU nationals can travel within the area visa-free
            and with no restrictions on the amount of time they spend in each
            country. Non-EEA nationals can travel to Schengen without a visa,
            but they cannot stay for longer than 90 days in 180.
            <br />
            <br />
            Note: By the time you read this, the law may have changed. Always consult a
            qualified immigration lawyer when planning to cross any border.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="mr-2 text-lg">Is this an official Schengen calculator?</div>
          </AccordionTrigger>
          <AccordionContent className="mb-8">
            No, this calculator is just a helping tool to try to assist you in
            keeping within the 90/180 rule.
            <br />
            <br />
            This site and the contents within offers no guarantee of it&apos;s
            accuracy of calculation or accuracy for keeping up to date with the
            European Economic Area immigration law, this site and contents
            within does not represent any EU member nor does it constitute any
            legal advice.
            <br />
            <br />
            Always consult a qualified immigration lawyer when planning to cross
            any border.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            <div className="mr-2 text-lg">
              Reporting an issue or contributing
            </div>
          </AccordionTrigger>
          <AccordionContent className="mb-8">
            The home of the project can be found on GitHub
            {' '}
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://github.com/ThrowingSpoon/90-180-calc"
            >
              here
            </Link>
            <br />
            <br />
            All issue reports or feedback are encouraged, and can be left on the project&apos;s github page
            {' '}
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://github.com/ThrowingSpoon/90-180-calc/issues/new"
            >
              here
            </Link>
            <br />
            <br />
            All contributions are greatly appreciated, and can be made on a fork
            of the project&apos;s source code
            {' '}
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://github.com/ThrowingSpoon/90-180-calc/fork"
            >
              here
            </Link>
            , and then a pull request can be opened
            {' '}
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://github.com/ThrowingSpoon/90-180-calc/pulls"
            >
              here
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
