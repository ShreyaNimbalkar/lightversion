import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { site } from "@/data/site";
import { findCatalogProduct } from "@/lib/quotation-catalog-options";
import {
  formatInr,
  lineAmount,
  quotationTotals,
  type QuotationFormData,
} from "@/lib/quotation-types";

const BRAND = "#ff6b35";
const SLATE = "#1e2a3b";
const MUTED = "#5a6b7d";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: SLATE,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: SLATE,
    padding: 16,
    marginBottom: 20,
    borderRadius: 4,
  },
  headerLeft: { flex: 1 },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: 1,
  },
  headerMeta: {
    marginTop: 6,
    fontSize: 9,
    color: "#e2e8f0",
  },
  logo: {
    width: 120,
    height: 40,
    objectFit: "contain",
  },
  sectionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d8dee6",
    borderRadius: 4,
    padding: 10,
  },
  boxLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: BRAND,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  boxText: {
    fontSize: 9,
    lineHeight: 1.45,
    color: SLATE,
  },
  subject: {
    marginBottom: 12,
    fontSize: 10,
    fontWeight: 700,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: BRAND,
    color: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontSize: 8,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf0",
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontSize: 8,
  },
  colSr: { width: "6%" },
  colDesc: { width: "34%" },
  colHsn: { width: "12%" },
  colQty: { width: "10%", textAlign: "right" },
  colUnit: { width: "10%" },
  colRate: { width: "14%", textAlign: "right" },
  colAmt: { width: "14%", textAlign: "right" },
  totalsWrap: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
    marginBottom: 4,
    fontSize: 9,
  },
  grandTotal: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
    marginTop: 4,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: SLATE,
    fontSize: 11,
    fontWeight: 700,
  },
  notes: {
    marginTop: 14,
    fontSize: 8,
    color: MUTED,
    lineHeight: 1.4,
  },
  footer: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
  signBlock: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: SLATE,
    paddingTop: 8,
    minHeight: 56,
  },
  signLabel: {
    fontSize: 8,
    color: MUTED,
    marginTop: 4,
  },
  signTitle: {
    fontSize: 9,
    fontWeight: 700,
    marginBottom: 32,
  },
  validity: {
    marginTop: 8,
    fontSize: 8,
    color: MUTED,
  },
  catalogTitle: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 9,
    fontWeight: 700,
    color: BRAND,
  },
  catalogRow: {
    fontSize: 8,
    lineHeight: 1.4,
    color: SLATE,
    marginBottom: 3,
  },
});

type Props = {
  data: QuotationFormData;
  logoUrl: string;
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function QuotationPdfDocument({ data, logoUrl }: Props) {
  const { subtotal, gstAmount, grandTotal } = quotationTotals(data.lineItems, data.gstPercent);
  const office = site.locations[0];
  const officeLine = office.lines.join(", ");

  return (
    <Document title={`Quotation ${data.quotationNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>QUOTATION</Text>
            <Text style={styles.headerMeta}>Quotation No: {data.quotationNumber}</Text>
            <Text style={styles.headerMeta}>Date: {formatDate(data.quotationDate)}</Text>
            {data.validUntil ? (
              <Text style={styles.headerMeta}>Valid until: {formatDate(data.validUntil)}</Text>
            ) : null}
          </View>
          {logoUrl ? <Image src={logoUrl} style={styles.logo} /> : null}
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>FROM</Text>
            <Text style={styles.boxText}>{site.legalName}</Text>
            <Text style={styles.boxText}>{officeLine}</Text>
            <Text style={styles.boxText}>Email: {site.email}</Text>
            <Text style={styles.boxText}>Phone: {site.phoneLine}</Text>
            <Text style={styles.boxText}>GSTIN: {site.gstin}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>FOR</Text>
            <Text style={styles.boxText}>{data.clientName || "—"}</Text>
            <Text style={styles.boxText}>Phone: {data.clientPhone || "—"}</Text>
            <Text style={styles.boxText}>Email: {data.clientEmail || "—"}</Text>
            <Text style={styles.boxText}>
              {data.clientAddress || "—"}
              {data.clientPincode ? ` — ${data.clientPincode}` : ""}
            </Text>
            <Text style={styles.boxText}>GSTIN: {data.clientGstin || "—"}</Text>
          </View>
        </View>

        {data.subject ? <Text style={styles.subject}>Subject: {data.subject}</Text> : null}

        {data.selectedCatalogSlugs.length > 0 ? (
          <View>
            <Text style={styles.catalogTitle}>Services & products requested</Text>
            {data.selectedCatalogSlugs.map((slug, index) => {
              const product = findCatalogProduct(slug);
              if (!product) return null;
              return (
                <Text key={slug} style={styles.catalogRow}>
                  {index + 1}. {product.serviceLabel} — {product.categoryTitle} — {product.productName}{" "}
                  ({product.priceFrom})
                </Text>
              );
            })}
          </View>
        ) : null}

        <View style={{ marginTop: 10 }}>
          <Text style={styles.catalogTitle}>Pricing</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.colSr}>#</Text>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colHsn}>HSN/SAC</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colUnit}>Unit</Text>
            <Text style={styles.colRate}>Rate</Text>
            <Text style={styles.colAmt}>Amount</Text>
          </View>
          {data.lineItems.map((item, index) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colSr}>{index + 1}</Text>
              <Text style={styles.colDesc}>{item.description || "—"}</Text>
              <Text style={styles.colHsn}>{item.hsnSac || "—"}</Text>
              <Text style={styles.colQty}>{item.qty}</Text>
              <Text style={styles.colUnit}>{item.unit}</Text>
              <Text style={styles.colRate}>{formatInr(item.rate)}</Text>
              <Text style={styles.colAmt}>{formatInr(lineAmount(item))}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsWrap}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>{formatInr(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>GST ({data.gstPercent}%)</Text>
            <Text>{formatInr(gstAmount)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text>Grand total</Text>
            <Text>{formatInr(grandTotal)}</Text>
          </View>
        </View>

        {data.paymentTerms ? (
          <Text style={styles.notes}>Payment terms: {data.paymentTerms}</Text>
        ) : null}
        {data.notes ? <Text style={styles.notes}>Notes: {data.notes}</Text> : null}

        <View style={styles.footer}>
          <View style={styles.signBlock}>
            <Text style={styles.signTitle}>Client acceptance</Text>
            <Text style={styles.signLabel}>Signature & stamp</Text>
            <Text style={styles.signLabel}>Date: ___________________</Text>
          </View>
          <View style={styles.signBlock}>
            <Text style={styles.signTitle}>For {site.brandName}</Text>
            <Text style={styles.signLabel}>Authorised signatory</Text>
            <Text style={styles.signLabel}>{site.proprietor}</Text>
          </View>
        </View>

        <Text style={styles.validity}>
          This quotation is computer-generated. Prices and scope are subject to confirmation at{" "}
          {site.brandName}, Pune.
        </Text>
      </Page>
    </Document>
  );
}
